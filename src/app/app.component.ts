import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgServiceWorker, NgPushRegistration } from '@angular/service-worker';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  registration: NgPushRegistration;

  constructor(private sw: NgServiceWorker) {
    console.debug('before registering for push');
    console.debug('21:52');

    sw.registerForPush({
      applicationServerKey: 'BBc7Bb5f5CRJp7cx19kPHz5d9S5jFSzogxEj2V1C44WuhTwd78tnXLPzOxGe0bUmKJUTAMemSKFzyQjSBN_-XyE'
    })
    .subscribe(r => {
      console.debug('successfully registered', r);
      this.registration = r;
    },
    err => {
      console.error('error registering for push', err);
    });

    sw.push.subscribe(push => {
      console.debug('received push message', push);
    });

    sw.log().subscribe(log => console.debug('log', log));
    
    
    sw.updates.subscribe(u => {
      console.debug('update event', u);
      if (u.type == 'pending') {
        sw.activateUpdate(u.version).subscribe(e => {
          console.debug('updated', e);
          alert("App updated! Reload App!");
          // location.reload();
        });
      }
    });

    sw.checkForUpdate();
    
  }

  checkForUpdate() {
    console.debug('checkForUpdate');
    this.sw.checkForUpdate().subscribe(u => {
      console.debug('update 3', u);
    });
   
  }
 
}
