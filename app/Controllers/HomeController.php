<?php

namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Controllers\PageController;
use App\Model\PeopleController;

class HomeController{

    public function index(Request $request, Response $response, $args){
        $page = new PageController();
        $page->setTpl("index");
        return $response;
    }

    public function store(Request $request, Response $response, $args)
    {
        $people = new PeopleController();
        var_dump($db);
        //$data = json_decode($db, true);
        //$people->setData($_POST[]);
        //var_dump($people);
        //$people->save();
        //header("Location: /");
        return $response;
    }
}


?>