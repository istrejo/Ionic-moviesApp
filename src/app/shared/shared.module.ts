import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './pipes/image.pipe';
import { SlideshowBackdropComponent } from './components/slideshow-backdrop/slideshow-backdrop.component';
import { SwiperModule } from 'swiper/angular';
import { IonicModule } from '@ionic/angular';
import { SlideshowPosterComponent } from './components/slideshow-poster/slideshow-poster.component';
import { PairSlidesComponent } from './components/pair-slides/pair-slides.component';
import { PairsPipe } from './pipes/pairs.pipe';
import { DetailComponent } from './components/detail/detail.component';

const components = [
  SlideshowBackdropComponent,
  SlideshowPosterComponent,
  PairSlidesComponent,
  DetailComponent,
];
const pipes = [ImagePipe, PairsPipe];

@NgModule({
  declarations: [pipes, components],
  imports: [CommonModule, SwiperModule, IonicModule],
  exports: [pipes, components],
})
export class SharedModule {}
