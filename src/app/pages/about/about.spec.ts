import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../services/user-service';

const userServiceMock = {
  getUsers: () => of([]),
};

describe('About', () => {
  let fixture: ComponentFixture<any>;
  let component: any;
  let AboutComponent: any;

  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });

    const module = await import('./about');
    AboutComponent = module.About;

    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [
        provideTranslateService(),
        provideRouter([]),
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
