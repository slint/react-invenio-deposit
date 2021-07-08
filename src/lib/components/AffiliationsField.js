// This file is part of React-Invenio-Deposit
// Copyright (C) 2020-2021 CERN.
// Copyright (C) 2020 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FieldLabel, RemoteSelectField } from 'react-invenio-forms';
import { Field, getIn } from 'formik';

/**Affiliation input component */
export class AffiliationsField extends Component {
  serializeAffiliations = (affiliations) =>
    affiliations.map((affiliation) => ({
      text: affiliation.name,
      value: affiliation.name,
      key: affiliation.name,
      ...(affiliation.id ? { id: affiliation.id } : {}),
      name: affiliation.name,
    }));

  render() {
    const { fieldPath } = this.props;
    return (
      <Field name={this.props.fieldPath}>
        {({ form: { values }, ...rest }) => {
          return (
            <RemoteSelectField
              fieldPath={fieldPath}
              suggestionAPIUrl="/api/affiliations"
              suggestionAPIHeaders={{
                Accept: 'application/json',
              }}
              initialSuggestions={getIn(values, fieldPath, [])}
              serializeSuggestions={this.serializeAffiliations}
              placeholder="Search or create affiliation'"
              label={
                <FieldLabel
                  htmlFor={`${fieldPath}.name`}
                  label={'Affiliations'}
                />
              }
              noQueryMessage="Search for affiliations.."
              allowAdditions
              clearable
              multiple
              onValueChange={({ formikProps }, selectedSuggestions) => {
                formikProps.form.setFieldValue(
                  fieldPath,
                  // save the suggestion objects so we can extract information
                  // about which value added by the user
                  selectedSuggestions
                );
              }}
              value={getIn(values, fieldPath, []).map((val) => val.name)}
            />
          );
        }}
      </Field>
    );
  }
}

AffiliationsField.propTypes = {
  fieldPath: PropTypes.string.isRequired,
};
