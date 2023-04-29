import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  SelectField,
  Submit,
  ColorField
} from '@redwoodjs/forms';


const CategoryForm = (props) => {
  const onSubmit = (data) => {
    data.currencyId = parseInt(data.currencyId)
    props.onSave(data, props?.category?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.category?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="color"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Color
        </Label>

        <ColorField
          name="color"
          defaultValue={props.category?.color}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="color" className="rw-field-error" />

        <Label
          name="currency"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Currency
        </Label>

        {
          props.currencies ?
            <SelectField
              name="currencyId"
              defaultValue={props.category?.currencyId}
              className="rw-input"
              errorClassName="rw-input rw-input-error"
              validation={{ required: true }}
            >
              {props.currencies?.map((currency) => (
                <option key={currency.id} value={currency.id}>
                  {currency.name}
                </option>
              ))}
            </SelectField>
            :
            // Infomar que primero se necesita una categoria
            <div className="rw-error">
              <p>Primero debes crear una currency</p>
            </div>
        }

        <FieldError name="currency" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default CategoryForm
