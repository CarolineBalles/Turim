<?php if(!class_exists('Rain\Tpl')){exit;}?>
        <div class="container">
            <div class="row">
                <div class="col mt-2">
                    <button type="button" class="btn btn-success" onclick="myFunction()">Gravar</button>
                    <button class="btn btn-primary" id="read">Ler</button>
                    <input type="text" name="" id="input_people" placeholder="Digite seu Nome">
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col">
                    <h1>Pessoas</h1>
                    <p id="people_name"></p>
                    <button id="enter_sons">Adicionar filho</button>
                    <p id="sons_name"></p>
                </div>
                <div class="col mt-3">
                    <textarea name="people" id="people" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
        