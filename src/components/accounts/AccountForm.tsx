import { useState, type FormEvent } from 'react'
import {
  createAccountFromDraft,
  emptyAccountDraft,
  validateAccountDraft,
  type Account,
  type AccountDraft,
  type AccountErrors,
} from '../../domain/account'
import './AccountForm.css'

type AccountFormProps = {
  onSubmit: (account: Account) => void
}

export function AccountForm({ onSubmit }: AccountFormProps) {
  const [draft, setDraft] = useState<AccountDraft>(emptyAccountDraft)
  const [errors, setErrors] = useState<AccountErrors>({})

  function updateField(field: keyof AccountDraft, value: string) {
    setDraft((currentDraft) => ({ ...currentDraft, [field]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateAccountDraft(draft)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    onSubmit(createAccountFromDraft(draft, crypto.randomUUID()))
    setDraft(emptyAccountDraft)
    setErrors({})
  }

  return (
    <form className="account-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <p className="eyebrow">NOVA OBRIGAÇÃO</p>
          <h2>Cadastrar conta</h2>
        </div>
        <p className="form-hint">Campos marcados com * são obrigatórios.</p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="account-name">Nome da conta *</label>
          <input
            id="account-name"
            value={draft.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'account-name-error' : undefined}
            autoComplete="off"
          />
          {errors.name && (
            <span className="field-error" id="account-name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="account-company">Empresa ou credor</label>
          <input
            id="account-company"
            value={draft.company}
            onChange={(event) => updateField('company', event.target.value)}
            autoComplete="organization"
          />
        </div>

        <div className="form-field">
          <label htmlFor="account-amount">Valor (R$)</label>
          <input
            id="account-amount"
            inputMode="decimal"
            placeholder="Ex.: 120,50"
            value={draft.amount}
            onChange={(event) => updateField('amount', event.target.value)}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'account-amount-error' : undefined}
          />
          {errors.amount && (
            <span className="field-error" id="account-amount-error">
              {errors.amount}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="account-due-date">Vencimento</label>
          <input
            id="account-due-date"
            type="date"
            value={draft.dueDate}
            onChange={(event) => updateField('dueDate', event.target.value)}
            aria-invalid={Boolean(errors.dueDate)}
            aria-describedby={
              errors.dueDate ? 'account-due-date-error' : undefined
            }
          />
          {errors.dueDate && (
            <span className="field-error" id="account-due-date-error">
              {errors.dueDate}
            </span>
          )}
        </div>

        <div className="form-field form-field-full">
          <label htmlFor="account-notes">Observações</label>
          <textarea
            id="account-notes"
            rows={3}
            value={draft.notes}
            onChange={(event) => updateField('notes', event.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="button button-primary" type="submit">
          Cadastrar conta
        </button>
      </div>
    </form>
  )
}