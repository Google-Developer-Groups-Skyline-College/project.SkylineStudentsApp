// todo:
// revise testing to use https://callstack.github.io/react-native-testing-library/docs/start/intro

import * as React from 'react'
import { create } from 'react-test-renderer'

import ThemedText from '../ThemedText'

it(`renders correctly`, () => {
  const tree = create(<ThemedText>Snapshot test!</ThemedText>).toJSON()

  expect(tree).toMatchSnapshot()
})
