import { TranslatesEnum } from "../enums/translates.enum";
import { VirtualInputEnum } from "../enums/virtual-input.enum";

export interface VirtualKeyConfigInterface {
    id: TranslatesEnum;
    key: VirtualInputEnum;
    label: string;
}