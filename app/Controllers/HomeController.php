<?php

namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Controllers\PageController;

class HomeController{

    public function index(Request $request, Response $response, $args){
        $page = new PageController();
        $page->setTpl("index");
        return $response;
    }

    public function store()
    {
        var_dump($_POST);
        die();
    }
}


?>