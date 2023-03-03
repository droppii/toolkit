import React from 'react';
import Section from './section';
import Block from './bock';
import SectionHeader from './sectionHeader';
import { KSectionProps } from '../../types';

export default class KSection extends React.PureComponent<KSectionProps, any> {
  static Block = Block;

  static SectionHeader = SectionHeader;

  constructor(props: KSectionProps) {
    super(props);
  }

  render() {
    return <Section {...this.props} />;
  }
}
