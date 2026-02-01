export interface Publication {
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
}

export const publications: Publication[] = [
  {
    authors: 'Akalu YT, Patel RS, Taft J, Canas-Arranz R, Geltman R, Richardson A, Buta S, Martin-Fernandez M, Sazeides C, Pearl RL, Mainkar G, Kurland AP, Rosberger H, Kang DD, Kurian AA, Kaur K, Altman J, Dong Y, Johnson JR, Zangi L, Lim JK, Albrecht RA, García-Sastre A, Rosenberg BR, Bogunovic D',
    title: 'An mRNA-based broad-spectrum antiviral inspired by ISG15 deficiency protects against viral infections in vitro and in vivo',
    journal: 'Science Translational Medicine',
    year: 2025,
    doi: '10.1126/scitranslmed.adx5758',
    pmid: '40802739',
  },
  {
    authors: 'Gruber C, Randolph HE, Patel R, Ramba M, Calzoni E, Huang LH, Levy J, Buta S, Lee A, Sazeides C, Prue Z, van Konijnenburg DPH, Chinn IK, Pedroza LA, Lupski JR, Schmitt EG, Cooper MA, Puel A, Peng X, Boisson-Dupuis S, Bustamante J, Okada S, Martin-Fernandez M, Orange JS, Casanova JL, Milner JD, Bogunovic D',
    title: 'Monoallelic expression can govern penetrance of inborn errors of immunity',
    journal: 'Nature',
    year: 2025,
    doi: '10.1038/s41586-024-08346-4',
    pmid: '39743591',
  },
  {
    authors: 'Akalu YT, Patel RS, Taft J, Canas-Arranz R, Richardson A, Buta S, Martin-Fernandez M, Sazeides C, Pearl RL, Mainkar G, Kurland AP, Geltman R, Rosberger H, Kang DD, Kurian AA, Kaur K, Altman J, Dong Y, Johnson JR, Zhangi L, Lim JK, Albrecht RA, García-Sastre A, Rosenberg BR, Bogunovic D',
    title: 'Broad-spectrum RNA antiviral inspired by ISG15 -/- deficiency',
    journal: 'bioRxiv (Preprint)',
    year: 2024,
    doi: '10.1101/2024.06.24.600468',
    pmid: '38979204',
  },
  {
    authors: 'Torre D, Fstkchyan YS, Ho JSY, Cheon Y, Patel RS, Degrace EJ, Mzoughi S, Schwarz M, Mohammed K, Seo JS, Romero-Bueno R, Demircioglu D, Hasson D, Tang W, Mahajani SU, Campisi L, Zheng S, Song WS, Wang YC, Shah H, Francoeur N, Soto J, Salfati Z, Weirauch MT, Warburton P, Beaumont K, Smith ML, Mulder L, Villalta SA, Kessenbrock K, Jang C, Lee D, De Rubeis S, Cobos I, Tam O, Hammell MG, Seldin M, Shi Y, Basu U, Sebastiano V, Byun M, Sebra R, Rosenberg BR, Benner C, Guccione E, Marazzi I',
    title: 'Nuclear RNA catabolism controls endogenous retroviruses, gene expression asymmetry, and dedifferentiation',
    journal: 'Molecular Cell',
    year: 2023,
    doi: '10.1016/j.molcel.2023.10.036',
    pmid: '37995687',
  },
  {
    authors: 'Malle L, Patel RS, Martin-Fernandez M, Stewart OJ, Philippot Q, Buta S, Richardson A, Barcessat V, Taft J, Bastard P, Samuels J, Mircher C, Rebillat AS, Maillebouis L, Vilaire-Meunier M, Tuballes K, Rosenberg BR, Trachtman R, Casanova JL, Notarangelo LD, Gnjatic S, Bush D, Bogunovic D',
    title: 'Autoimmunity in Down\'s syndrome via cytokines, CD4 T cells and CD11c+ B cells',
    journal: 'Nature',
    year: 2023,
    doi: '10.1038/s41586-023-05736-y',
    pmid: '36813963',
  },
  {
    authors: 'Cohen P, DeGrace EJ, Danziger O, Patel RS, Barrall EA, Bobrowski T, Kehrer T, Cupic A, Miorin L, García-Sastre A, Rosenberg BR',
    title: 'Unambiguous detection of SARS-CoV-2 subgenomic mRNAs with single-cell RNA sequencing',
    journal: 'Microbiology Spectrum',
    year: 2023,
    doi: '10.1128/spectrum.00776-23',
    pmid: '37676044',
  },
  {
    authors: 'Prescott RA, Pankow AP, de Vries M, Crosse KM, Patel RS, Alu M, Loomis C, Torres V, Koralov S, Ivanova E, Dittmann M, Rosenberg BR',
    title: 'A comparative study of in vitro air-liquid interface culture models of the human airway epithelium evaluating cellular heterogeneity and gene expression at single cell resolution',
    journal: 'Respiratory Research',
    year: 2023,
    doi: '10.1186/s12931-023-02514-2',
    pmid: '37635251',
  },
  {
    authors: 'Danziger O, Patel RS, DeGrace EJ, Rosen MR, Rosenberg BR',
    title: 'Inducible CRISPR activation screen for interferon-stimulated genes identifies OAS1 as a SARS-CoV-2 restriction factor',
    journal: 'PLoS Pathogens',
    year: 2022,
    doi: '10.1371/journal.ppat.1010464',
    pmid: '35421191',
  },
  {
    authors: 'Nilsson-Payant BE, Uhl S, Grimont A, Doane AS, Cohen P, Patel RS, Higgins CA, Acklin JA, Bram Y, Chandar V, Blanco-Melo D, Panis M, Lim JK, Elemento O, Schwartz RE, Rosenberg BR, Chandwani R, tenOever BR',
    title: 'The NF-κB Transcriptional Footprint Is Essential for SARS-CoV-2 Replication',
    journal: 'Journal of Virology',
    year: 2021,
    doi: '10.1128/JVI.01257-21',
    pmid: '34523966',
  },
  {
    authors: 'Patel RS, Tomlinson JE, Divers TJ, Van de Walle GR, Rosenberg BR',
    title: 'Single-cell resolution landscape of equine peripheral blood mononuclear cells reveals diverse cell types including T-bet+ B cells',
    journal: 'BMC Biology',
    year: 2021,
    doi: '10.1186/s12915-020-00947-5',
    pmid: '33482825',
  },
  {
    authors: 'Miorin L, Kehrer T, Sanchez-Aparicio MT, Zhang K, Cohen P, Patel RS, Cupic A, Makio T, Mei M, Moreno E, Danziger O, White KM, Rathnasinghe R, Uccellini M, Gao S, Aydillo T, Mena I, Yin X, Martin-Sancho L, Krogan NJ, Chanda SK, Schotsaert M, Wozniak RW, Ren Y, Rosenberg BR, Fontoura BMA, García-Sastre A',
    title: 'SARS-CoV-2 Orf6 hijacks Nup98 to block STAT nuclear import and antagonize interferon signaling',
    journal: 'Proceedings of the National Academy of Sciences (PNAS)',
    year: 2020,
    doi: '10.1073/pnas.2016650117',
    pmid: '33097660',
  },
  {
    authors: 'Gruber CN, Patel RS, Trachtman R, Lepow L, Amanat F, Krammer F, Wilson KM, Onel K, Geanon D, Tuballes K, Patel M, Mouskas K, O\'Donnell T, Merritt E, Simons NW, Barcessat V, Del Valle DM, Udondem S, Kang G, Gangadharan S, Ofori-Amanfo G, Laserson U, Rahman A, Kim-Schulze S, Charney AW, Gnjatic S, Gelb BD, Merad M, Bogunovic D',
    title: 'Mapping Systemic Inflammation and Antibody Responses in Multisystem Inflammatory Syndrome in Children (MIS-C)',
    journal: 'Cell',
    year: 2020,
    doi: '10.1016/j.cell.2020.09.016',
    pmid: '32991843',
  },
  {
    authors: 'Gonzalez-Rivera C, Khara P, Awad D, Patel R, Li YG, Bogisch M, Christie PJ',
    title: 'Two pKM101-Encoded Proteins, the Pilus-Tip Protein TraC and Pep, Assemble on the Escherichia coli Cell Surface as Adhesins Required for Efficient Conjugative DNA Transfer',
    journal: 'Molecular Microbiology',
    year: 2018,
    doi: '10.1111/mmi.14141',
    pmid: '30264928',
  },
  {
    authors: 'Gordon JE, Costa TRD, Patel RS, Gonzalez-Rivera C, Sarkar MK, Orlova EV, Waksman G, Christie PJ',
    title: 'Use of chimeric type IV secretion systems to define contributions of outer membrane subassemblies for contact-dependent translocation',
    journal: 'Molecular Microbiology',
    year: 2017,
    doi: '10.1111/mmi.13734',
  },
  {
    authors: 'Patel RS, Lessor LE, Hernandez AC, Everett GFK',
    title: 'Complete Genome Sequence of Enterotoxigenic Escherichia coli N4-Like Podophage Pollock',
    journal: 'Genome Announcements',
    year: 2015,
    doi: '10.1128/genomeA.01431-14',
    pmid: '25635029',
  },
];
