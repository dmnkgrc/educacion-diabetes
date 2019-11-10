import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AppState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-clusters',
  templateUrl: './admin-clusters.component.html',
  styleUrls: ['./admin-clusters.component.scss'],
})
export class AdminClustersComponent implements OnInit {
  collapsedSideBar = true;
  public name: string;
  public usersId: number[];
  public students$: Observable<any>;
  public clusters$: Observable<any[]>;
  private editClusterMode = false;
  public clusterId: number;
  constructor(public store: Store<AppState>, public userService: UserService) {}

  ngOnInit() {
    this.clusters$ = this.userService.getAllClusters();
    this.students$ = this.userService.getAllStudents();
  }

  toggleSideBar() {
    this.collapsedSideBar = !this.collapsedSideBar;
  }

  public createCluster() {
    if (this.name) {
      const data = {
        name: this.name,
        users: this.usersId || [],
      };
      if (this.editClusterMode) {
        this.editClusterMode = false;
        return this.userService
          .editCluster(data, this.clusterId)
          .subscribe(() => {
            this.clusters$ = this.userService.getAllClusters();
          });
      }
      return this.userService.createCluster(data).subscribe(() => {
        this.clusters$ = this.userService.getAllClusters();
      });
    }
    alert('Nombre requerido');
  }

  public editCluster(event: any, cluster: any, popModal = false) {
    this.name = cluster.name;
    this.editClusterMode = true;
    this.clusterId = cluster.id;
    this.usersId = cluster.all_users.map(user => user.id);
    if (popModal) {
      setTimeout(() => {
        const search = 'edit-clusters-' + this.clusterId;
        document.getElementById(search).click();
      }, 1000);
    }
  }

  public deleteCluster(event: any, id: number) {
    event.stopPropagation();
    if (confirm('¿Estás seguro?')) {
      return this.userService.deleteCluster(id).subscribe(() => {
        this.clusters$ = this.userService.getAllClusters();
      });
    }
  }
}
