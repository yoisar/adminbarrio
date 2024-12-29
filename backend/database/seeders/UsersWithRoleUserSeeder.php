<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersWithRoleUserSeeder extends Seeder
{
    public function run()
    {
        $users = [
            ['name' => 'User 1', 'email' => 'user1@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 2', 'email' => 'user2@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 3', 'email' => 'user3@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 4', 'email' => 'user4@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 5', 'email' => 'user5@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 6', 'email' => 'user6@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 7', 'email' => 'user7@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 8', 'email' => 'user8@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 9', 'email' => 'user9@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 10', 'email' => 'user10@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 11', 'email' => 'user11@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 12', 'email' => 'user12@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 13', 'email' => 'user13@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 14', 'email' => 'user14@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 15', 'email' => 'user15@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 16', 'email' => 'user16@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 17', 'email' => 'user17@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 18', 'email' => 'user18@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 19', 'email' => 'user19@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
            ['name' => 'User 20', 'email' => 'user20@example.com', 'password' => Hash::make('password'), 'role' => 'user'],
        ];

        User::insert($users);
    }
}