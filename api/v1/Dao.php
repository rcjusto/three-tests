<?php
require_once 'meekrodb.2.3.class.php';

class Dao
{

    var $database;

    /**
     * Db constructor.
     */
    public function __construct()
    {
        DB::$host = 'localhost';
        DB::$user = 'root';
        DB::$password = 'root';
        DB::$dbName = 'json_api';

        DB::$error_handler = false; // since we're catching errors, don't need error handler
        DB::$throw_exception_on_error = true;
    }

    public function query($select, $params)
    {
        if (count($params)==3)
            return DB::query($select, $params[0], $params[1], $params[2]);
        if (count($params)==2)
            return DB::query($select, $params[0], $params[1]);
        if (count($params)==1)
            return DB::query($select, $params[0]);
        else
            return DB::query($select);
    }

    public function getOne($table, $key, $id)
    {
        return DB::query("select * from $table where $key=%s", $id);
    }

    public function update($table, $key, $value, $data)
    {
        DB::update($table, $data, "$key=%s", $value);
        return DB::affectedRows();
    }


    public function insert($table, $data)
    {
        DB::insert($table, $data);
        return DB::affectedRows();
    }

    public function delete($table, $key, $value)
    {
        DB::delete($table, "$key=%s", $value);
        return DB::affectedRows();
    }

}

