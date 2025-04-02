import { forwardRef } from 'react'
import BottomSheet, { BottomSheetProps } from '@gorhom/bottom-sheet'

import { useThemeColor } from '@/hooks/useThemeColor'
import { cssInterop } from 'nativewind'

const InterOpBottomSheet = cssInterop(BottomSheet, {
    backgroundClassName: {
        target: 'backgroundStyle'
    }
})

interface ThemedBottomSheetProps extends BottomSheetProps {
    backgroundClassName?: string
}

export const ThemedBottomSheet = forwardRef<BottomSheet, ThemedBottomSheetProps>(function ThemedBottomSheet(props, ref) {
    const backgroundColor = useThemeColor(null, 'background')

    return <InterOpBottomSheet ref={ref} backgroundClassName={`${props.backgroundClassName} ${backgroundColor}`} {...props} />
})

// alternative semi-working implementation, not using forwardRef

// import { Ref } from 'react'
// import BottomSheet , { BottomSheetProps } from '@gorhom/bottom-sheet'

// import { useThemeColor } from '@/hooks/useThemeColor'
// import { cssInterop } from 'nativewind'

// const InterOpBottomSheet = cssInterop(BottomSheet, {
//     backgroundClassName: {
//         target: 'backgroundStyle',
//     }
// })

// interface ThemedBottomSheetProps extends BottomSheetProps {
//     backgroundClassName?: string
//     ref: Ref<BottomSheet>
// }

// export default function ThemedBottomSheet({ ref, backgroundClassName, ...otherProps }: ThemedBottomSheetProps) {
//     const backgroundColor = useThemeColor(null, 'background')

//     return <InterOpBottomSheet ref={ref} backgroundClassName={`${backgroundClassName} ${backgroundColor}`} {...otherProps} />
// }