f=/usr/local/bin/nx-jeff-workloop
grep -niE 'stufe|freigabe|dry|NX_[A-Z_]+|environ|readonly|nur_lesen|modus' $f | grep -viE 'secret' | head -30
sed -n 720,760p $f
