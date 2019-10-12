import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasComponent } from './marcas.component';

describe('MarcasComponent', () => {
  let component: MarcasComponent;
  let fixture: ComponentFixture<MarcasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcasComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
