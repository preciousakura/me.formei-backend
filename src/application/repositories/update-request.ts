export type UpdateRequest<T> = {
  id: string;
  data: Partial<T>;
};
