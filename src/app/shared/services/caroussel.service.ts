import { animate, AnimationBuilder, AnimationFactory, style } from '@angular/animations';
import { ElementRef, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Carouselervice {

    private timing = '250ms ease-in';
    currentSlide = 0;

    constructor(private builder: AnimationBuilder) { }

    onClickNext(carousel: ElementRef, itemsLength: number, itemWidth: number) {
        this.calculateCurrentSlide(itemsLength);
        this.continueAnimation(carousel, itemWidth);
    }

    onClickPrevious(carousel: ElementRef, itemsLength: number, itemWidth: number) {
        this.calculateCurrentSlide(itemsLength, true);
        this.continueAnimation(carousel, itemWidth);
    }

    private calculateCurrentSlide(itemsLength: number, toPrevious: boolean = false): void {
        this.currentSlide = toPrevious ?
            ((this.currentSlide - 1) + itemsLength) % itemsLength :
            (this.currentSlide + 1) % itemsLength;
    }

    private continueAnimation(carousel: ElementRef, itemWidth: number): void {
        const offset = this.currentSlide * itemWidth;
        const myAnimation: AnimationFactory = this.buildAnimation(offset);
        const player = myAnimation.create(carousel.nativeElement);
        player.play();
    }

    private buildAnimation(offset: number) {
        return this.builder.build([
            animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
        ]);
    }
}