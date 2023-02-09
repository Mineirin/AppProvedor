import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  nome: string = "";
  email: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";

  antigo: string = "";
  antigo2: string = "";

  constructor(
    private router:Router,
    private provider:Api,
    private actRouter: ActivatedRoute,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    //ACT ROUTER SERVE PARA RECEBER E PASSAR PARAMETROS ENTRE PÁGINAS
    this.actRouter.params.subscribe((data: any) => {
      this.id = data.id;
      this.nome = data.nome;
      this.email = data.email;
      this.senha = data.senha;
      this.nivel = data.nivel;

      this.antigo = data.email;

    });
  }

  async mensagem(mensagem, cor) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
  }

  register() {
    return new Promise(resolve => {
      let dados = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        cargo: this.nivel,
        id: this.id,
        antigo: this.antigo,


      }
      this.provider.dadosApi(dados, 'usuarios/inserir.php').subscribe(
        data => {

          if (data['ok'] == true) {
            this.router.navigate(['usuarios']);
            this.mensagem(data['mensagem'], 'success');
            this.limparCampos();
          } else {
            this.mensagem(data['mensagem'], 'danger');
          }


        }
      )
    });
  }


  limparCampos() {
    this.nome = "";
    this.email = "";
    this.senha = "";
    this.nivel = "";

  }

}
