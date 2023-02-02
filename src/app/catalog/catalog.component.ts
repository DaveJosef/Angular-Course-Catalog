import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Curso } from './Curso';

interface EditionPermission {
  editing: boolean,
  creating: boolean
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.sass']
})
export class CatalogComponent implements OnInit {

  public permissionStatus: EditionPermission = {
    creating: true,
    editing: true,
  };
  public curso: Curso = {
    id: 1,
    nome: "",
    valor: "",
  };
  public cursos: Curso[] = [];

  constructor(
    private catalogService: CatalogService,
  ) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.catalogService.list().subscribe((res: Curso[]) => {
      this.cursos = res;
      this.updatePermissionStatus(this.curso.id);
      console.log(res);
    });
  }

  create(curso: Curso): void {
    if (!this.checkFields(curso)) return;
    if (this.findCurso(curso.id)) {
      alert('Já existe um curso com este id!');
      return;
    }
    this.catalogService.create(curso).subscribe((res) => {
      this.list();
      console.log(res);
    })
  }

  checkFields(curso: Curso): boolean {
    return !!curso.nome && !!curso.valor;
  }

  update(id: number, curso: Curso): void {
    if (!this.checkFields(curso)) return;
    if (!this.findCurso(curso.id)) {
      alert('Não existe um curso com este id!');
      return;
    }
    this.catalogService.update(id, curso).subscribe((res) => {
      this.list();
      console.log(res);
    })
  }

  delete(id: number): void {
    this.catalogService.delete(id).subscribe((res) => {
      this.list();
      console.log(res);
    })
  }

  updatePermissionStatus(id: number): void {
    if (this.findCurso(id)) {
      this.permissionStatus.creating = false;
      this.permissionStatus.editing = true;
    } else {
      this.permissionStatus.creating = true;
      this.permissionStatus.editing = false;
    }
  }

  setCurso(curso: Curso): void {
    const { id, nome, valor } = curso;
    this.curso = { id, nome, valor };
    this.updatePermissionStatus(id);
  }

  findCurso(id: number): boolean {
    return this.cursos.findIndex((curso: Curso) => curso.id === id) != -1;
  }

}
