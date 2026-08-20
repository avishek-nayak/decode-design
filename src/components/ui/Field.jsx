import { forwardRef, useId } from 'react';
import clsx from 'clsx';

/**
 * Form field with a persistent label, an error linked via aria-describedby,
 * and the error itself announced through role="alert".
 *
 * Renders input / textarea / select from the same component so every field
 * on the site is labelled and described identically.
 */
export const Field = forwardRef(function Field(
  {
    label,
    as = 'input',
    error,
    hint,
    required,
    className,
    options,
    id: idProp,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') ||
    undefined;

  const controlProps = {
    id,
    ref,
    className: 'field__control',
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    required,
    ...rest,
  };

  return (
    <div className={clsx('field', error && 'field--invalid', className)}>
      <label htmlFor={id} className="field__label t-mono">
        {label}
        {required ? (
          <>
            {' '}
            <span aria-hidden="true">*</span>
            <span className="visually-hidden">(required)</span>
          </>
        ) : null}
      </label>

      {as === 'textarea' ? (
        <textarea {...controlProps} />
      ) : as === 'select' ? (
        <select {...controlProps}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...controlProps} />
      )}

      {hint ? (
        <p id={hintId} className="t-small subtle">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} role="alert" className="field__error t-mono">
          {error}
        </p>
      ) : null}
    </div>
  );
});
