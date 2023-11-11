import { AppInjector } from "src/app/app.module";
import { ResourcesService } from "../../services/resources.services";

export abstract class ResourceComponent {
    private resourcesService = AppInjector.get(ResourcesService);

    getPathResource(resource: string): string {
        
        return this.resourcesService.getPathResource(resource);
    }
}