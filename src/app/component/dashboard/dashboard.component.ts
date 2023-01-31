import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Funcionario } from 'src/app/model/funcionario.model';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  funcionarios: FormGroup;
  addFuncionario = false;
  employees: Funcionario[] = [];

  constructor(
      private fb: FormBuilder,
      private DataService: DataService,
    ) {
      this.funcionarios = this.fb.group({
        nome: [''],
        email: [''],
        salario: [''],
        cargo: ['']
      })
     }

  ngOnInit(): void {
    this.getAllFuncionarios();
  }

  addEmployee() {
    const funcionario = this.funcionarios.value as Funcionario;
    this.DataService.addFuncionario(funcionario).subscribe(() => {
      this.funcionarios.reset();
      this.addFuncionario = false;
    })
  }

  getAllFuncionarios() {
    this.DataService.getAllFuncionarios().subscribe(data => {
      this.employees =  (data as Array<any>).map(e => {
        return {
          id: e.payload.doc.id,
          nome: e.payload.doc.data()['nome'],
          email: e.payload.doc.data()['email'],
          salario: e.payload.doc.data()['salario'],
          cargo: e.payload.doc.data()['cargo']
        } as Funcionario;
      });
    });
  }
  
  editEmployee(emp: Funcionario) {
    this.funcionarios.controls['nome'].setValue(emp.nome);
    this.funcionarios.controls['email'].setValue(emp.email);
    this.funcionarios.controls['salario'].setValue(emp.salario);
    this.funcionarios.controls['cargo'].setValue(emp.cargo);
  }

  updateEmployee(key: string, employee: Funcionario) {
    this.DataService.updateFuncionario(key, employee)
    console.log(key, 'atualizado com sucesso')
  }

  deleteEmployee(id: string) {
    this.DataService.deleteFuncionario(id)
    console.log(id, 'deletado com sucesso')
  }
}