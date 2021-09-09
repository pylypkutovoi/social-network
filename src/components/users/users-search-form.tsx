import React from 'react';
import { Formik, Form, Field } from 'formik';
import { FilterType } from '../../redux/users-reducer';
import { useSelector } from 'react-redux';
import { getUsersFilter } from '../../redux/users-selectors';


type PropsType = {
  onFilterChange: (filter: FilterType) => void;
}
type FriendValueType = 'true' | 'false' | 'null';
type FormValuesType = {
  term: string;
  friend: FriendValueType
}
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter);

  const onSubmit = (values: FormValuesType, { setSubmitting }: {setSubmitting: (isSubmitting: boolean) => void}) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChange(filter);
    setSubmitting(false);
  }
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{term: filter.term, friend: String(filter.friend) as FriendValueType}}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field name="friend" as="select"> 
            <option value={"null"}>All</option>
            <option value={'true'}>Followed</option>
            <option value={'false'}>Unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
        )}
      </Formik>
    </div>
  )
});
  
  export default UsersSearchForm
  
