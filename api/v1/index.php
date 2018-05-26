<?php
require "Dao.php";

$pathInfo = str_replace($_SERVER['SCRIPT_NAME'], '', $_SERVER['REQUEST_URI']);
$params = explode('/', trim($pathInfo, "/"));
$folder = array_shift($params);
$id = count($params) > 0 ? $params[0] : null;

/** @var Dao $dao */
$dao = new Dao();
$method = strtoupper($_SERVER['REQUEST_METHOD']);

$headers = getallheaders();
if ($method!='OPTIONS' && (is_null($headers['Authorization']) || !authorized($dao, $headers['Authorization']))) {
    sendResponse(401);
    exit;
}

switch ($method) {
    case "GET":
        if (count($params) > 0) {
            get($dao, $folder, $id);
        } else {
            getAll($dao, $folder);
        }
        break;
    case "PUT":
        if (!is_null($id)) {
            put($dao, $folder, $id);
        } else {
            error("not supported");
        }
        break;
    case "POST":
        if (!is_null($id)) {
            error("not supported");
        } else {
            post($dao, $folder);
        }
        break;
    case "DELETE":
        if (!is_null($id)) {
            del($dao, $id);
        } else {
            error("not supported");
        }
        break;
    case "OPTIONS":
        header("HTTP/1.1 200 OK", true, 200);
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Host');
        break;
    default:
        error("Method not supported");
}

function authorized($dao, $token) {
    $res = $dao->getOne("apikeys", "id", $token);
    return count($res)>0;
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

function get($dao, $folder, $id)
{
    $res = $dao->getOne("documents", "id", $id);
    if (count($res) > 0 && $res[0]["folder"]==$folder) {
        $doc = processDoc($res[0]);
        if (!is_null($doc)) {
            sendResponse(200, postProcessData($folder, $doc));
        } else {
            error("Not Found", 404);
        }
    } else {
        error("Not Found", 404);
    }
}

function getAll($dao, $folder)
{
    $result = array();
    $res = $dao->query("select * from documents where folder=%s", [$folder]);
    foreach ($res as $elem) {
        $doc = processDoc($elem);
        if (!is_null($doc)) {
            array_push($result, $doc);
        }
    }
    sendResponse(200, postProcessList($folder, $result));
}

function put($dao, $folder, $id)
{
    $entityBody = file_get_contents('php://input');
    $json = @json_decode($entityBody, true);
    if (!is_null($json)) {
        try {
            unset($json['folder']);
            $data = array(
                "folder" => $folder,
                "name" => in_array("name", $json) ? $json["name"] : "",
                "description" => in_array("description", $json) ? $json["description"] : "",
                "body" => @json_encode($json)
            );
            $dao->update("documents", "id", $id, $data);
            get($dao, $folder, $id);
        } catch (MeekroDBException $e) {
            error($e->getMessage());
        }

    } else {
        error("Wrong JSON data");
    }
}

function post($dao, $folder)
{
    $entityBody = file_get_contents('php://input');
    $json = @json_decode($entityBody, true);
    if (!is_null($json)) {
        try {
            $newId = gen_uuid();
            unset($json['folder']);
            $data = array(
                "id" => $newId,
                "folder" => $folder,
                "name" => $json["name"],
                "description" => $json["description"],
                "body" => @json_encode($json)
            );
            $dao->insert("documents", $data);
            get($dao, $folder, $newId);
        } catch (MeekroDBException $e) {
            error($e->getMessage());
        }

    } else {
        error("Wrong JSON data");
    }
}

function del($dao, $id)
{
    $res = $dao->delete("documents", "id", $id);
    if ($res > 0) {
        sendResponse(200);
    } else {
        error("Not Found", 404);
    }
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

function gen_uuid()
{
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        // 32 bits for "time_low"
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),

        // 16 bits for "time_mid"
        mt_rand(0, 0xffff),

        // 16 bits for "time_hi_and_version",
        // four most significant bits holds version number 4
        mt_rand(0, 0x0fff) | 0x4000,

        // 16 bits, 8 bits for "clk_seq_hi_res",
        // 8 bits for "clk_seq_low",
        // two most significant bits holds zero and one for variant DCE1.1
        mt_rand(0, 0x3fff) | 0x8000,

        // 48 bits for "node"
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}