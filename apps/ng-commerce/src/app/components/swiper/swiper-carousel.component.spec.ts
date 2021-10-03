import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperCarouselComponent } from './swiper-carousel.component';

describe('SwiperCarouselComponent', () => {
  let component: SwiperCarouselComponent;
  let fixture: ComponentFixture<SwiperCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiperCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
