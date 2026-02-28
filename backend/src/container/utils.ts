import "reflect-metadata";
import { container, Lifecycle } from "tsyringe";

export const mapClass = (
  type: symbol,
  clazz: any,
  lifecycle: Lifecycle = Lifecycle.Singleton,
) => {
  container.register(
    type,
    {
      useClass: clazz,
    },
    { lifecycle: lifecycle },
  );
};

export const mapValue = <T>(type: symbol, value: T) => {
  container.register(type, {
    useValue: value,
  });
};

export const mapInstance = <T>(type: symbol, instance: T) => {
  container.registerInstance(type, instance);
};
