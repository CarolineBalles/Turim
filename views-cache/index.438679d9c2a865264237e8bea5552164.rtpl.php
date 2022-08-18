<?php if(!class_exists('Rain\Tpl')){exit;}?>        <div class="container">
            <header class="p-3 mb-2 bg-warning text-dark">
                <center><h1>Cadastro de Pessoas</h1></center>
            </header>
            <article>
                <div class="row">
                    <div class="col mt-2">
                        <button type="button" class="btn btn-success" id="record" onclick="sendDb()">Gravar</button>
                        <button type="button" class="btn btn-primary" id="read" onclick="readDb()">Ler</button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-10">
                        <label for="input_father">Nome:</label>
                        <input class="form-control col-2" type="text" id="input_father" placeholder="Digite seu Nome">
                    </div>
                    <div class="col-2">
                        <button type="button" class="btn btn-primary mt-4" onclick="addFather()">Incluir</button>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <h1>Pessoas</h1>
                        <div class= "col table_container" id="table"></div>
                    </div>
                    <div class="col mt-3">
                        <textarea class="form-control" name="everybody" id="everybody" cols="30" rows="20"></textarea>
                    </div>
                </div>
            </article> 
        </div>
        