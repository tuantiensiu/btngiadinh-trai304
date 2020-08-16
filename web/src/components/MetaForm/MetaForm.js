import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/web'

const MetaForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.meta?.id)
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
          name="key"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Key
        </Label>
        <TextField
          name="key"
          defaultValue={props.meta?.key}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="key" className="rw-field-error" />

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Value
        </Label>
        <TextField
          name="value"
          defaultValue={props.meta?.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="value" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>
        <TextField
          name="type"
          defaultValue={props.meta?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="type" className="rw-field-error" />

        <Label
          name="draftProfileId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Draft profile id
        </Label>
        <TextField
          name="draftProfileId"
          defaultValue={props.meta?.draftProfileId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="draftProfileId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MetaForm
