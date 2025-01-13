import { applyDecorators, UseGuards } from "@nestjs/common";
import { Auth_Guard } from "@auth/guards/auth.guard";
import { UserOrAdmin_Guard } from "@auth/guards/userOrAdmin.guard";
import { Admin_Guard } from "@auth/guards/admin.guard";
import { AdminOrSupport_Guard } from "@auth/guards/adminOrSupport.guard";


export function Auth() {

  return applyDecorators(

    UseGuards(Auth_Guard)

  );
}

export function Auth_SameIdOrAdmin() {

  return applyDecorators(

    UseGuards(Auth_Guard, UserOrAdmin_Guard)

  );
}

export function Auth_Admin() {

  return applyDecorators(

    UseGuards(Auth_Guard, Admin_Guard)

  );
}

export function Auth_AdminOrSupport() {

  return applyDecorators(

    UseGuards(Auth_Guard, AdminOrSupport_Guard)

  );
}

// export function Auth_Admin_Internal() {

//     return applyDecorators(
//         UseGuards(AuthGuard('jwt'), Admin_Internal_Guard)
//     );
// }

// export function Auth_SameID() {

//     return applyDecorators(
//         // RoleProtect(...roles),
//         UseGuards(AuthGuard('jwt'), SameUserAuthGuard)

//         // UseGuards(AuthGuard, RolesGuard),
//         // ApiBearerAuth(),
//         // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
//     );
// }



