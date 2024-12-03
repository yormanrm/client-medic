import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { StorageService } from "../services/storage.service";
import { IToken } from "../interfaces/token.interface";
import { SweetalertService } from "../services/sweetalert.service";

export const roleGuard: CanActivateFn = (route, state) => {

    const storage = inject(StorageService);
    const sweetalert = inject(SweetalertService);
    const router = inject(Router);
    const token: IToken = storage.getSessionItem("token");

    // Obtén los roles permitidos de los datos de la ruta
    const allowedRoles = route.data?.['roles'] as Array<string>;

    // Verifica si el rol del token está permitido
    if (!allowedRoles || !allowedRoles.includes(token.role)) {
        sweetalert.basicAlert("Access denied", "You do not have the necessary permissions to perform this action", "error");
        return router.createUrlTree(['/dashboard']);
    }

    return true;

};