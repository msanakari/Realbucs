import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  rotation: number;
}

@Component({
  selector: 'app-cashback-offer-modal',
  imports: [],
  templateUrl: './cashback-offer-modal.component.html',
  styleUrl: './cashback-offer-modal.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CashbackOfferModalComponent {
  @ViewChild('sparkCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private sparks: Spark[] = [];
  private animationFrameId: number | null = null;

  @Output() onClose = new EventEmitter<void>();

  private resizeObserver: ResizeObserver | null = null;
  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
  }

  close() {
    this.onClose.emit();
  }
}
