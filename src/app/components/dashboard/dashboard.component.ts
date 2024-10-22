// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  constructor(public dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
       
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
    
  }

  viewECard(email: string): void {
    // Construct the URL for the e-card route
    const url = `/e-card/${email}`;
    // Open the URL in a new tab
    window.open(url, '_blank');
  }

 

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '400px',
      data: null // No user data for creation
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe(
          (newUser: any) => {
            this.users.push(newUser);
          },
          (error: any) => {
            console.error('Error creating user:', error);
          }
        );
      }
    });
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '400px',
      data: user // Pass user data for editing
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(result).subscribe(
          (updatedUser:any) => {
            const index = this.users.findIndex(u => u.userId === updatedUser.userId);
            if (index !== -1) {
              this.users[index] = updatedUser;
            }
          },
          (error: any) => {
            console.error('Error updating user:', error);
          }
        );
      }
    });
  }

  deleteUser(index: number) {
    const userId = this.users[index].userId;
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users.splice(index, 1);
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    );
  }

 

}
