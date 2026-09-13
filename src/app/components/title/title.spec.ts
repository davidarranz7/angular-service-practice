import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from './title';
import { provideTranslateService } from '@ngx-translate/core';

describe('Title', () => {
  let component: Title;
  let fixture: ComponentFixture<Title>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Title],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(Title);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
