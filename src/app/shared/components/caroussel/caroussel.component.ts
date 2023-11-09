import { AfterViewInit, Component, ContentChildren, ElementRef, HostListener, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemElement } from '../../directives/caroussel-item-element.directive';
import { CarouselItemDirective } from '../../directives/carrousel-item.directive';
import { Carouselervice } from '../../services/caroussel.service';

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './caroussel.component.html',
  styleUrls: ['./caroussel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {

  @ContentChildren(CarouselItemDirective) items: QueryList<CarouselItemDirective> | null = null;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements: QueryList<ElementRef> | null = null;
  @ViewChild('carousel') private carousel: ElementRef | null = null;

  private itemWidth: number = 0;

  carouselWrapperStyle = {};

  get isNextVisible(): boolean {
    return this.service.currentSlide + 1 != this.items?.length;
  }

  get isPrevVisible(): boolean {
    return this.service.currentSlide != 0 ;
  }
  
  constructor( public service : Carouselervice ) { }

  ngAfterViewInit(): void {
    setTimeout(() => this.setItemWithAndStyle());
  }

  private setItemWithAndStyle(): void {
      this.itemWidth = this.itemsElements?.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`
      }
  }

  next(): void {
    if( !this.isNextVisible || !this.items || !this.carousel ) return;
    this.service.onClickNext(this.carousel, this.items.length, this.itemWidth);
  }

  prev(): void {
    if( !this.isPrevVisible || !this.items || !this.carousel) return;
    this.service.onClickPrevious(this.carousel, this.items.length, this.itemWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void { this.ngAfterViewInit() }

  ngOnDestroy(): void {
    this.service.currentSlide = 0;
  }
}