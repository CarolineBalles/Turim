<?php

use Slim\App;
use App\Controllers\HomeController;

return function(App $app)
{
    $app->get('/', [HomeController::class, 'index']);
    $app->post('/', [HomeController::class, 'store']);
    $app->get('/read', [HomeController::class, 'readDb']);
    $app->post('/read', [HomeController::class, 'readDb']);
} 

?>