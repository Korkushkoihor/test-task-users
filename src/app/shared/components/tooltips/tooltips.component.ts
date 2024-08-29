import { Component } from '@angular/core';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'app-tooltips',
  standalone: true,
  imports: [],
  templateUrl: './tooltips.component.html',
  styleUrl: './tooltips.component.scss'
})
export class TooltipsComponent {
  constructor(private tooltipService: TooltipService) {}

  public successTooltip = this.tooltipService.successTooltipStatus
  public warningTooltip = this.tooltipService.warningTooltipStatus;
}
