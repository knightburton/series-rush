export interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

export interface FormTextProps {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error?: string;
  label?: string;
  helperText?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface TitleProps {
  children: string;
}

export interface AppContentProps {
  children?: React.ReactNode;
}
