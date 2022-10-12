import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  let Token = null;
  if (variant === 'on-sale') {
    Token = <OnSaleBadge>Sale</OnSaleBadge>
  } else if (variant === 'new-release') {
    Token = <NewReleaseBadge>Just Released!</NewReleaseBadge>
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {Token}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Badge = styled.div`
  z-index: 2;
  position: absolute;
  top: 12px;
  right: -4px;
  border-radius: 2px;
  padding: 8px 12px;
  font-size: calc(14/16rem);
  font-weight: 700;
  text-transform: capitalize;
`

const NewReleaseBadge = styled(Badge)`
  color: white;
  background-color: ${COLORS.secondary};
`

const OnSaleBadge = styled(Badge)`
  color: white;
  background-color: ${COLORS.primary};
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
  isolation: isolate;
  width: 100%;
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  position: relative;
  background-color: ${COLORS.gray[100]};
`;

const Image = styled.img`
width: 100%;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
${p => p.variant === 'on-sale' && 'text-decoration: line-through; color:' + COLORS.gray[700] + ';'}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
