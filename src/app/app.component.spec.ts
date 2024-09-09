import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe('AppComponent', () => {

  it("should create the app", () => {
    /*
      WRAPPER DE LA APP
    */
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it("should be 3", () => {
    // ARRANGE
    const num1 = 1;
    const num2 = 2;

    //ACT
    const res = num1 + num2;

    //ASSERT
    expect(res).toBe(3);
  });

  it('should render title with my name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain("Facundo Morán");
  });
})
