import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const ContainerForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.container?.id)
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
          Tên không gian
        </Label>
        <TextField
          name="name"
          defaultValue={props.container?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="rw-field-error" />

        <Label
          name="note"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ghi chú
        </Label>
        <TextField
          name="note"
          defaultValue={props.container?.note}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="note" className="rw-field-error" />

        <Label
          name="capacity"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sức chứa
        </Label>
        <NumberField
          name="capacity"
          defaultValue={props.container?.capacity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="capacity" className="rw-field-error" />

        <Label
          name="containerTypeId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Loại không gian
        </Label>
        <TextField
          name="containerTypeId"
          defaultValue={props.container?.containerTypeId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="containerTypeId" className="rw-field-error" />

        <Label
          name="containerHostId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Chủ không gian
        </Label>
        <TextField
          name="containerHostId"
          defaultValue={props.container?.containerHostId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="containerHostId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ContainerForm
