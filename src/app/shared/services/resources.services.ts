import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ResourcesService {

  getPathResource(resouce: string): string {
    return `${environment.assetsFolder}${resouce}`;
  }
}
