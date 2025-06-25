import { Coffee } from "./Coffee";

// 🧱 Barista 클래스: Builder 역할을 수행
// 단계별로 커피 속성을 설정하고 최종 Coffee 객체를 생성함
export class Barista {
  private coffee: Coffee;

  constructor() {
    // 새로운 Coffee 인스턴스 생성
    this.coffee = new Coffee();
  }

  // 커피 크기 설정
  setSize(size: "small" | "medium" | "large"): Barista {
    this.coffee.size = size;
    return this; // 메서드 체이닝 지원
  }

  // 커피 종류 설정
  setType(type: "latte" | "americano" | "espresso"): Barista {
    this.coffee.type = type;
    return this;
  }

  // 우유 종류 설정
  setMilk(milk: "oat" | "whole" | "none"): Barista {
    this.coffee.milk = milk;
    return this;
  }

  // 추가 샷 개수 증가
  addShot(): Barista {
    this.coffee.extraShots += 1;
    return this;
  }

  // 최종 완성된 Coffee 객체 반환
  build(): Coffee {
    return this.coffee;
  }
}
