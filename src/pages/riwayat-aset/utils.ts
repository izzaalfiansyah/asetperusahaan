export const data_jenis: any[] = [
	'Aset Properti',
	'Aset Transportasi',
	'Aset Bisnis & Investasi',
	'Aset Kesehatan',
	'Aset Pendidikan',
	'Aset ESTEBU',
	'Aset SDM',
];

export const data_subjenis: {
	[key: string]: any[];
} = {
	'Aset Properti': ['Tanah', 'Bangunan'],
	'Aset Transportasi': [
		'Jaklingko',
		'LRT',
		'MRT',
		'Transjakarta',
		'Railink',
		'Computer Line',
		'Bus sekolah',
	],
	'Aset Bisnis & Investasi': ['DMPTSP', 'Restribusi', 'BUMD', 'Intensif', 'Statistik', 'LPSE'],
	'Aset Kesehatan': ['BPJS', 'Asuransi', 'KIS'],
	'Aset Pendidikan': ['BOS', 'Beasiswa', 'GNOTA'],
	'Aset ESTEBU': [
		'festival musik',
		'karnaval budaya',
		'Wisata kuliner',
		'Wisata bersejarah',
		'Topic branch 5',
	],
	'Aset SDM': [
		'Tenaga kerja terdidik',
		'Tenaga kerja terlatih',
		'Tenaga kerja tidak terlatih dan tidak terdidik',
		'Tenaga kerja rohani',
		'Topic Branch 5',
	],
};

export const data_subsubjenis: {
	[key: string]: any[];
} = {
	Tanah: ['Tanah basah', 'Tanah kering', 'Tanah pertanian', 'Tanah perkebunan', 'Tanah tandus'],
	Bangunan: [
		'Bangunan tempat tinggal',
		'Bangunan industri',
		'Bangunan perkantoran',
		'Bangunan tempat ibadah',
	],
};

export const data_sumber_anggaran: string[] = ['APBD', 'Non APBD'];

export const data_standarisasi_kebijakan: string[] = [
	'Undang-undang',
	'Peraturan Pemerintah',
	'Peraturan Menteri',
	'Peraturan Gubernur',
	'Peraturan Daerah',
];

export const data_sistem_pengadaan_aset: string[] = [
	'Direct procurement',
	'Tender pengadaan barang',
	'Request of proposal',
	'Request of quotation',
	'Vendor tunggal',
];
