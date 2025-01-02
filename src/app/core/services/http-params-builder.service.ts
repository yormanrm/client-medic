import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpParamsBuilderService {

    builder(paramsIn: any) {
        let paramsOut = new HttpParams();
        for (const key in paramsIn) {
            if (paramsIn.hasOwnProperty(key)) {
                paramsOut = paramsOut.append(key, paramsIn[key]);
            }
        }
        return paramsOut;
    }

}