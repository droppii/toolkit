import { KRatingSize, KSort, TypographyModifier, KStarValue } from '../../types';

class RatingKitHelper {
  labelWidth = 40;
  genPluralLabel = (stars: number) => (stars === 1 ? 'sao' : 'sao');
  fixScore = (score = 0) => {
    return score.toFixed(1);
    // const decimal = score - Math.floor(score) < 0.5 ? 0 : 0.5;
    // return (Math.floor(score) + decimal).toFixed(1);
  };
  genStatisticLabelHorizontal = (reviews: number) =>
    reviews === 1 ? `${reviews} đánh giá` : `${reviews} đánh giá`;

  genStatisticLabelVertical = (reviews: number, total: number) => {
    const left = reviews === 1 ? 'sao' : 'sao';
    const right = total === 1 ? 'sao' : 'sao';
    return `${this.fixScore(reviews)} ${left} trên ${total} ${right}`;
  };

  sort = 'desc' as KSort;

  handleSort = (values: Array<KStarValue>, sort: KSort) => {
    return values.sort((a, b) => {
      return (a.points - b.points) * (sort === 'asc' ? 1 : -1);
    });
  };

  getTotalRatings = (values: Array<KStarValue>) =>
    values.reduce((prev, cur) => prev + cur.reviews, 0);
  sumTotalRatings = (values: Array<KStarValue>) =>
    values.reduce((prev, cur) => prev + cur.reviews * cur.points, 0);
  getMaxStars = (values: Array<KStarValue>) => {
    let result = 0;
    values.forEach(i => {
      if (i.points > result) {
        result = i.points;
      }
    });
    return result;
  };
  mapSizeToTextTypo = (
    size: KRatingSize = 'medium'
  ): { avg: TypographyModifier; reviews: TypographyModifier } => {
    switch (size) {
      case 'large':
        return {
          avg: 'DisplayMdMedium',
          reviews: 'DisplayNmMedium',
        };
      case 'x-large':
        return {
          avg: 'DisplayLgMedium',
          reviews: 'DisplayMdNormal',
        };
      case 'small':
        return {
          avg: 'TextNmMedium',
          reviews: 'TextSmNormal',
        };
      case 'x-small':
        return {
          avg: 'TextXsBold',
          reviews: 'Text2XsNormal',
        };
      default:
        return {
          avg: 'DisplayXsMedium',
          reviews: 'TextLgNormal',
        };
    }
  };
}

export default new RatingKitHelper();
