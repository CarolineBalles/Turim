<?php

namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Controllers\PageController;
use App\Model\People;

class HomeController{

    public function index(Request $request, Response $response, $args){
        $page = new PageController();
        $page->setTpl("index");
        return $response;
    }

    public function store(Request $request, Response $response, $args)
    {
        $people = new People;
        $usuario = $_POST;
        var_dump($usuario);
        //$data = json_decode($usuario, true);
        //$people->setData($_POST[]);
        //var_dump($people);
        //$people->save();
        //header("Location: /");
    }

    public function readDb(Request $request, Response $response, $args)
    {
        $people = People::listAll();
        $page = new PageController();
        $page->setTpl("read", array(
            "people" => $people
        ));
        return $response;
    }
}


?>