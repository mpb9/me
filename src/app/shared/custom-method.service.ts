import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomMethodService {
  getCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
}
