<?php

$pathInfo = str_replace($_SERVER['SCRIPT_NAME'], '', $_SERVER['REQUEST_URI']);
$params = explode('/', trim($pathInfo, "/"));
$folder = array_shift($params);
$id = count($params) > 0 ? $params[0] : null;

$method = strtoupper($_SERVER['REQUEST_METHOD']);


switch ($method) {
    case "OPTIONS":
        header("HTTP/1.1 200 OK", true, 200);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        break;
    case "GET":
        if (count($params) > 0) {
            get($folder, $id);
        } else {
            getAll($folder);
        }
        break;
    case "PUT":
    case "POST":
    case "DELETE":
    default:
        error("Method not supported");
}

function postProcessData($folder, $data)
{
    switch ($folder) {
    }
    return $data;
}

function postProcessList($folder, $data)
{
    switch ($folder) {
    }
    return $data;
}

function processDoc($rec) {
    if (!is_null($rec["body"])) {
        $json = @json_decode($rec["body"], true);
        $json["id"] = $rec["id"];
        return $json;
    }
    return null;
}

function get($folder, $id)
{
    $file = __DIR__ . DIRECTORY_SEPARATOR . 'repo' . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR . $id;
    if (file_exists($file)) {
        header('Access-Control-Allow-Origin: *');
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: inline; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    } else {
        error("Not Found", 404);
    }
}

function getAll($folder)
{
    $folder = __DIR__ . DIRECTORY_SEPARATOR . 'repo' . DIRECTORY_SEPARATOR . $folder . DIRECTORY_SEPARATOR;
    $result = array();
    foreach (glob($folder . "*.*") as $filename) {
        $result[] = basename($filename);
    }
    sendResponse(200, postProcessList($folder, $result));
}

function error($err, $code = 400)
{
    sendResponse($code, null, $err);
}

function getMessage($code)
{
    switch ($code) {
        case 200:
            return "OK";
       case 401:
            return "Unauthorized";
        default:
            return " Unknown Error";
    }
}

function sendResponse($code, $data = null, $message = null)
{
    if (is_null($message)) {
        $message = getMessage($code);
    }
    header("HTTP/1.1 $code $message", true, $code);
    header('Access-Control-Allow-Origin: *');
    if (!is_null($data)) {
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
