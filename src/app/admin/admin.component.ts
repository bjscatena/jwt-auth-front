import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  vehicles = [];
  constructor(private vehiclesService: VehicleService) {}

  ngOnInit() {
    this.vehiclesService.getVehicles().subscribe(data => {
      this.vehicles = data._embedded.vehicles;
    });
  }
}
