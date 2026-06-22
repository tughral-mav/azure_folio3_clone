/** Global office directory — transcribed from the live footer (golden master). */
export type Office = { country: string; lines: string[] };

export const OFFICES: Office[] = [
  {
    country: 'US Office',
    lines: [
      '160 Bovet Road, Suite # 101, San Mateo, CA 94402 USA',
      'Pleasanton, California – 6701 Koll Center Parkway, #250 Pleasanton, CA 94566',
      'Tel: +1 408 412-3813',
      'Support: +1 (408) 512 1812',
    ],
  },
  {
    country: 'UAE Office',
    lines: [
      'Dubai, UAE – Dubai Internet City, 1st Floor, Building Number 12, Premises ED 29, Dubai, UAE',
      'Tel: +971-55-6540154',
      'Tel: +971-04-2505173',
    ],
  },
  {
    country: 'UK Office',
    lines: ['Export House, Cawsey Way, Woking Surrey, GU21 6QX', 'Tel: +44 (0) 14 8361 6611'],
  },
  {
    country: 'Mexico Office',
    lines: ['EPICENTRIA, Avenida Netzahualcóyotl 1597, Ciudad del Sol, Zapopan, Jalisco'],
  },
  {
    country: 'Pakistan Office',
    lines: [
      'Plot 26, Block B, SMCH Society, Main Shahrah-e-Faisal, Karachi',
      'Corporate 7 by Maaksons, Executive Block, Civic Center 1, Gulberg Green, Islamabad',
      'First Floor, Blue Mall 8-R, MM Alam Road Gulberg III, Lahore',
      'Tel: +92-21-3432 3721-4',
    ],
  },
  {
    country: 'Canada Office',
    lines: ['3080 Yonge Street, Suite 6060, Toronto, Ontario M4N 3N1', 'Tel: +1 408 365 4638', 'Support: +1 (408) 512 1812'],
  },
  {
    country: 'Bulgaria Office',
    lines: ['49 Bacho Kiro Street, Sofia, 1000, Bulgaria'],
  },
];

export const PHONE = '+1 (408) 412-3813';
