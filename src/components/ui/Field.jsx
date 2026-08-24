import { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Form field with a persistent label, an error linked via aria-describedby,
 * and the error itself announced through role="alert".
 *
 * Renders input / textarea / select from the same component so every field
 * on the site is labelled and described identically. The error animates in
 * rather than just appearing — still the same role="alert" element, so
 * screen readers hear it exactly as before.
 */
export const Field = forwardRef(function Field(
  { label, as = 'input', error, required, className, options, id: idProp, ...rest },
  ref,
) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;
  const reduced = usePrefersReducedMotion();

  const controlProps = {
    id,
    ref,
    className: 'field__control',
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? errorId : undefined,
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

      <AnimatePresence>
        {error ? (
          <motion.p
            key="error"
            id={errorId}
            role="alert"
            className="field__error t-mono"
            initial={reduced ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
});
